const core = require('@actions/core');
const { GitHub } = require('@actions/github');

async function run() {
  try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  const myToken = core.getInput('GITHUB_TOKEN');

  const tag = core.getInput('tag_name', { required: true });
  const label = tag.substr(10, tag.length-1);

  const query = `type:pr+label:${label}`;

  const octokit = new GitHub(myToken);

  const { data: pullRequest } = await octokit.search.issuesAndPullRequests({
      q: query
  });

  let changelog;

  for (const items in pullRequest) {
    for(const PR in items) {
      console.log(PR);
      // changelog += `- [${ PR.title }](${ PR.url })\n`;
    }
  }


  core.setOutput('changelog', changelog);

  console.log(changelog);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();