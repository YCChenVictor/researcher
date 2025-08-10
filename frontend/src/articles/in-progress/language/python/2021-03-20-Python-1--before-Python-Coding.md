---
title: (Python_1) before Python Coding
description: Python Presettin
date: '2021-03-20T06:21:23.158Z'
categories: []
keywords: []
slug: /@t5204713910/python-1-before-python-coding-c9a1a7443ec
---

### Python Presetting

#### Install homebrew

[https://brew.sh/index\_zh-tw](https://brew.sh/index_zh-tw)

#### Install pyenv

pyenv controls the version of python

$ brew install pyenv  
$ brew install pyenv-virtualenv

#### Check The Versions Available

$ pyenv install -l

#### Install python

$ pyenv install 3.9.1

#### Check installed python

$ pyenv versions

#### Use particular version — 3.9.1

$ pyenv local 3.9.1

#### Install pip

$ `sudo easy_install pip`

#### Add .gitignore

In project, add file, .gitignore as follow, so that git can ignore the files we do not want to control the version

\# Byte-compiled / optimized / DLL files  
\_\_pycache\_\_/  
\*.py\[cod\]  
\*$py.class  
  
\# C extensions  
\*.so  
  
\# Distribution / packaging  
.Python  
env/  
build/  
develop-eggs/  
dist/  
downloads/  
eggs/  
.eggs/  
lib/  
lib64/  
parts/  
sdist/  
var/  
wheels/  
\*.egg-info/  
.installed.cfg  
\*.egg  
  
\# PyInstaller  
\#  Usually these files are written by a python script from a template  
\#  before PyInstaller builds the exe, so as to inject date/other infos into it.  
\*.manifest  
\*.spec  
  
\# Installer logs  
pip-log.txt  
pip-delete-this-directory.txt  
  
\# Unit test / coverage reports  
htmlcov/  
.tox/  
.coverage  
.coverage.\*  
.cache  
nosetests.xml  
coverage.xml  
\*.cover  
.hypothesis/  
  
\# Translations  
\*.mo  
\*.pot  
  
\# Django stuff:  
\*.log  
local\_settings.py  
  
\# Flask stuff:  
instance/  
.webassets-cache  
  
\# Scrapy stuff:  
.scrapy  
  
\# Sphinx documentation  
docs/\_build/  
  
\# PyBuilder  
target/  
  
\# Jupyter Notebook  
.ipynb\_checkpoints  
  
\# pyenv  
.python-version  
  
\# celery beat schedule file  
celerybeat-schedule  
  
\# SageMath parsed files  
\*.sage.py  
  
\# dotenv  
.env  
  
\# virtualenv  
.venv  
venv/  
ENV/  
  
\# Spyder project settings  
.spyderproject  
.spyproject  
  
\# Rope project settings  
.ropeproject  
  
\# mkdocs documentation  
/site  
  
\# mypy  
.mypy\_cache/  
  
.idea/  
\*.iml  
.DS\_Store

### Virtual Environment

#### Why?

To manage Python packages for many different projects, which avoids installing packages globally, avoiding breaking system tools or other projects.

#### Install virtual environment tool

$ pip3 install virtualenv

#### Create virtual environment

$ python3 -m virtualenv env

#### Activate virtual environment

$ source env/bin/activate

#### Install some package we want in this project

$ pip install 'something'

#### Check the installed modules

pip freeze > requirements.txt

#### Freeze the requirements

To create a list of packages used in this project, so that the user can install them

pip freeze > requirements.txt

#### Leave Virtual Environment

```
deactivate
```

### Basic Project Structure

#### Why?

As long as implementing the codes on other machines is required, we need it. With clear structure, people interested in our projects can deploy it quickly.

#### Recommended Project Structure

reference: [Hitchhiker’s Structuring Your Project](https://docs.python-guide.org/writing/structure/), [repository](https://github.com/navdeep-G/samplemod)

![](/Users/chenyongzhe/coding/practice_not_for_github/javascript_practice/medium-to-markdown/medium-export/posts/md_1623056197395/img/1__mujbZoQY9OmQxzXxl__ectw.png)

1.  README.rst explains the usage of this project to the potential users
2.  LICENSE legalize the usage of this project
3.  setup.py for Package and distribution management. (reference: [setuptools](https://pythonhosted.org/an_example_pypi_project/setuptools.html) or [distutils](https://docs.python.org/3/distutils/introduction.html))
4.  requirements.txt tells users the required modules to launch this project
5.  sample stores the main codes for this project
6.  docs for Package reference documentation
7.  tests stores the test files such unit testing