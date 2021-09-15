# Sync Directory

## Table of Contents
- [Install](#install)
- [Setup](#setup)
- [Usage](#usage)
- [Bash integration](#bash-integration)

#### Install

```shell
$ yarn
```

Requirements:
- yarn >= 3.0.2
- node >= 16.9.1

#### Setup

Required to have `config.json` like the following

```json
{
	"projectname": {
		"src": "~/folder/inside/home/dir",
		"dest": "/some/external/dir/to/your/web/server"
	},
	"another-project": {
		"src": "~/a/folder/somewhere",
		"dest": "~/just/a/local/folder"
	},
	"forceDeleteDest": true
}
```

__Important__

Careful with `forceDeleteDest`, if true then you are ok to empty the `dest` path<br/>
Do make sure that the dest path is not an important folder since clean task would empty it.

#### Usage

```shell
$ gulp sync --project=projectname      # copy files to another dir
$ gulp clean --project=projectname     # empty dir of dest dir
$ gulp build  --project=projectname    # same with sync task without gulp watch
```

#### Bash integration

In your `~/.bash_profile` you can set the following
```shell
source "/home/user/somewhere/syncdir/cli-bash.sh"
```

Then do `source ~/.bash_profile` then you can test the following commands:

```shell
$ syncd[tab]ir [tab]           # display list of projects
$ syncdir projectname          # same with sync task
$ syncdirConfig projectname    # display project settings
$ syncdirClean projectname     # empty dest dir
$ syncdirProd projectname      # same with prod task
