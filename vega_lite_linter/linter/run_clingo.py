from clyngor import ASP, solve
import os, json
import subprocess
from typing import Dict, List, Optional, Tuple, Union
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

file_cache: Dict[str, bytes] = {}

def load_file(path: str) -> bytes:
    content = file_cache.get(path)
    if content is not None:
        return content
    with open(path, "r") as f:
        content = f.read().encode("utf8")
        file_cache[path] = content
        return content

DRACO_LP = [
    "define.lp",
    "hard.lp",
    "output.lp",
]

DRACO_LP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "./rules/")

def run(input_fact):
    program = "\n".join(input_fact)

    files = DRACO_LP
    file_names = [os.path.join(DRACO_LP_DIR, f) for f in files]
    asp_program = b"\n".join(map(load_file, file_names)) + program.encode("utf8")

    options = ["--outf=2", "--quiet=1,2,2"]

    cmd = ["clingo"] + options
    logger.debug("Command: %s", " ".join(cmd))

    proc = subprocess.Popen(
        args=cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    stdout, stderr = proc.communicate(asp_program)

    try:
        json_result = json.loads(stdout)
    except json.JSONDecodeError:
        logger.error("stdout: %s", stdout)
        logger.error("stderr: %s", stderr)
        raise

    if stderr:
        logger.error(stderr)

    result = json_result["Result"]

    violated_rules = []
    if result == "UNSATISFIABLE":
        logger.info("Constraints are unsatisfiable.")
    elif result == "SATISFIABLE":
        answers = json_result["Call"][0]["Witnesses"][-1]

        assert (
            json_result["Models"]["Number"] == 1
        ), "Should not have more than one model if we don't optimize"

        logger.debug(answers["Value"])
        violated_rules = answers["Value"]

    return violated_rules