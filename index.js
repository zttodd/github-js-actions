const core = require('@actions/core');
const { GitHub } = require('@actions/github');

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN');
    const repo = core.getInput('repo_name', { required: true });
    const number = core.getInput('pull_number', { required: true });
    const owner = core.getInput('owner_name', { required: true });
    const label = repo.substr(6, repo.length - 1);
    const query = `type:pr+label:v${label}`;
    const octokit = new GitHub(myToken);

    const { data: pullRequest } = await octokit.search.issuesAndPullRequests({
      q: query
    });

    let changelog = '';

    pullRequest.items.forEach(function(item) {
      changelog += `- [${item.title}](${item.html_url})\n`;
    });

    await octokit.pulls.update({
      owner,
      repo,
      pull_number: number,
      body: changelog
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();