/* eslint-disable */
import { execSync } from "child_process";

// 获取最近一次发布的标签
const lastRelease = execSync(
  "git for-each-ref --sort=-creatordate --format='%(refname:short)' \"refs/tags/v*\" | head -n 1",
)
  .toString()
  .trim();

// 获取 Git 提交记录
const commits = execSync(`git log ${lastRelease}.. --pretty=format:"%s" --reverse`).toString().trim();

/**
 * 生成changelog（直接使用commit标题）
 * @param {string} commits - commit标题列表，用换行分隔
 * @returns {string} 格式化的changelog
 */
function generateChangelog(commits) {
  if (!commits || commits.trim() === "") {
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