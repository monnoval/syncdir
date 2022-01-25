#!/usr/bin/env bash

# get current script dir
# https://stackoverflow.com/a/246128
SYNCD_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# exit if SYNCD_DIR is not set
if [[ -z ${SYNCD_DIR+x} ]]; then
	echo "SYNCD_DIR is not set"
	(exit 33)
fi

# check $SYNCD_DIR
if [[ ! -d $SYNCD_DIR ]]; then
	echo "SYNCD_DIR > $SYNCD_DIR"
	echo "    is not a valid directory"
	(exit 33)
fi

# list of projects
_codeComplete() {
	local cur=${COMP_WORDS[COMP_CWORD]}
	COMPREPLY=( $(compgen -W "$(eval cd $SYNCD_DIR && yarn list)" -- $cur) )
}

# tab completion for projects
complete -F _codeComplete syncdir
complete -F _codeComplete syncdirConfig
complete -F _codeComplete syncdirClean
complete -F _codeComplete syncdirProd

syncdir()       { eval cd $SYNCD_DIR && yarn sync --project=$1 && cd -; }
syncdirConfig() { eval cd $SYNCD_DIR && yarn config --project=$1 && cd -; }
syncdirClean()  { eval cd $SYNCD_DIR && yarn clean --project=$1 && cd -; }
syncdirProd()   { eval cd $SYNCD_DIR && yarn prod --project=$1 && cd -; }
