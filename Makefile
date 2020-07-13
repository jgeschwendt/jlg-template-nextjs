update:
	yarn set version latest
	yarn dlx npm-check-updates -u
	# yarn dlx @yarnpkg/pnpify --sdk
	yarn install
