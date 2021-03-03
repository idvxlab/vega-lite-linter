import setuptools

# with open("README.md", "r") as fh:
#     long_description = fh.read()

setuptools.setup(
    name="vega-lite-linter",
    version="0.0.1",
    author="fuling sun",
    author_email="fulingsun515@gmail.com",
    description="a python package for vega-lite lint and quick-fix",
    long_description="",
    long_description_content_type="text/markdown",
    url="https://github.com/idvxlab/vega-lite-linter",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)