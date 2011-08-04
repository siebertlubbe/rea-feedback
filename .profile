add_to_path() {
	## Adds a directory to $PATH, only if the directory exists and isn't already in PATH.
	## Appends by default, with option to prepend.
	dir=`readlink -e "${1}"`
	if ! echo ":$PATH:" | grep ":${dir:-}:" > /dev/null 2>&1; then
		if [ -d "$1" ]; then
			if [ "$2" = 'prepend' ]; then
				PATH="$1:$PATH"
			else
				## Appends by default
				PATH="$PATH:$1"
			fi
		fi
	fi
}

GEM_HOME="${HOME}/id/.gem"
GEM_PATH="${HOME}/id/.gem"
export GEM_HOME GEM_PATH

## If a new version of bundler is released, this doesn't upgrade.
## In return, we get faster checks (no network required) in the common case when bundler is installed.
echo "Setting up the bundler gem"
if ! gem list bundler -i > /dev/null 2>&1; then
	echo "Bundler not installed, installing..."
	gem install bundler --no-rdoc --no-ri
else
	echo "Bundler already installed"
fi
add_to_path "${GEM_HOME}/bin"

echo "Setting up rubygem bundles"
bundle install
