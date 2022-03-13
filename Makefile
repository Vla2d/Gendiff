install:
	npm install
ci:
	npm ci
publish:
	npm publish --dry-run
link:
	npm link
lint:
	npx eslint .
test:
	npm run test
test-coverage:
	npm test -- --coverage --coverageProvider=v8