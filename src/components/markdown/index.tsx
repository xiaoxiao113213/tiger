import React from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true, // 启用 HTML 标签解析
  linkify: true, // 自动将 URL 转为链接
  typographer: true, // 启用智能排版（比如替换引号）
});

const MarkdownViewer = ({ content,backgroundColor }: { content: string, backgroundColor?: string }) => {
  const renderedMarkdown = md.render(content);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
      style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, backgroundColor: backgroundColor }}
    />
  );
};

export default MarkdownViewer;
