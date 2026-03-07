/* eslint-disable */
import { execSync } from "child_process";

function run(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    throw Error(`failed to run command: ${cmd}`)
  }
}

// 获取最近一次发布的标签
const lastRelease = run(
  "git for-each-ref --sort=-creatordate --format='%(refname:short)' \"refs/tags/v*\" | head -n 1",
)

// 获取 commit
let commits;

if (lastRelease) {
  // 有 tag
  commits = run(`git log --pretty=format:"%s" --reverse ${lastRelease}..HEAD`);
} else {
  // 没有 tag，全部 commit
  commits = run(`git log --pretty=format:"%s" --reverse`);
}

/**
 * 生成 changelog
 */
function generateChangelog(commits) {
  if (!commits) {
    return "## Changelog\n\nno commits found.";
  }

  const commitList = commits
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((commit) => `- ${commit}`)
    .join("\n");

  return `## Changelog

${commitList}
`;
}

const fallbackChangelog = generateChangelog(commits);
console.log(fallbackChangelog);