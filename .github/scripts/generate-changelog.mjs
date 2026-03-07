/* eslint-disable */
import { execSync } from "child_process";

// 获取最近一次发布的标签
const lastRelease = execSync(
  "git for-each-ref --sort=-creatordate --format='%(refname:short)' \"refs/tags/v*\" | head -n 1",
)
  .toString()
  .trim();

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