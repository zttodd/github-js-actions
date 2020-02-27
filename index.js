const core = require('@actions/core');
const { GitHub } = require('@actions/github');

async function run() {
  try {
    const myToken = core.getInput('github_token');

    const tag = core.getInput('tag_name', { required: true });
    const label = tag.substr(10, tag.length-1);

    const query = `type:pr+label:${label}`;

    const octokit = new GitHub(myToken);

    const { data: pullRequest } = await octokit.search.issuesAndPullRequests({
        q: query
    });

    let changelog;

    pullRequest.items.forEach(function(item) {
      console.log(item.title);
      console.log(item.html_url);

      changelog += `- [${ item.title }](${ item.html_url })\n`;
    })

    core.setOutput('changelog', changelog);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();