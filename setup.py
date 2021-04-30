import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

install_requires = [
    "clyngor~=0.3.31",
    "PuLP~=2.4",
    "pandas~=1.2.3",
    "vega_datasets~=0.7.0"

]

setuptools.setup(
    name="vega-lite-linter",
    version="0.0.1",
    author="idvxlab",
    author_email="idvxlab@gmail.com",
    description="a python package for vega-lite lint and quick-fix",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/idvxlab/vega-lite-linter",
    packages=setuptools.find_packages(),
    install_requires=install_requires,
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)