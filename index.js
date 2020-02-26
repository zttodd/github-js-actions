const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log('In the code.');
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  const myToken = core.getInput('GITHUB_TOKEN');
  console.log('Got mytoken:' + myToken);
  const tag = core.getInput('tag_name', { required: true });
  console.log('tag: ' + tag);
  const label = tag.substr(10, tag.length-1);
  console.log('label: ' + label);

  const octokit = new github.GitHub(myToken);

  const { data: pullRequest } = await octokit.issues.listForRepo({
      owner: 'octokit',
      repo: 'rest.js',
      labels: label
  });

  console.log(pullRequest);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();