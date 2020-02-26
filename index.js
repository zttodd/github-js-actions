const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  const myToken = core.getInput(process.env.GITHUB_TOKEN);
  const label = core.getInput('tag_name', { required: true });

  const octokit = new GitHub(myToken);

  const { data: pullRequest } = await octokit.pulls.get({
      owner: 'octokit',
      repo: 'rest.js',
      labels: label,
      mediaType: {
        format: 'diff'
      }
  });

  console.log(pullRequest);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();