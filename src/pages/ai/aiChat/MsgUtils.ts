export function getThinkMsg(msg?: String): { think: String; answer: String } {
  if (!msg) {
    return { think: '', answer: '' };
  }
  //   如果以<think>\n开头，则说明think的内容开始了

  //  如果  </think>\n\n 出现了，则说明think的内容结束了
  //   如果以<think>\n开头，则说明think的内容开始了
  const thinkStart = msg.indexOf('<think>\n');
  const thinkEnd = msg.indexOf('</think>\n\n');
  //   如果没有thinkStart 则直接返回 answer
  if (thinkStart === -1) {
    return { think: '', answer: msg };
  }

  //   如果有thinkStart 和 thinkEnd 则返回 think 和 answer
  let think: string;
  let answer = '';
  //   如果没有thinkEnd 则直接返回 answer
  if (thinkEnd === -1) {
    think = msg.substring(thinkStart + '<think>\n'.length);
  } else {
    think = msg.substring(thinkStart + '<think>\n'.length, thinkEnd);
    answer = msg.substring(0, thinkStart) + msg.substring(thinkEnd + '</think>\n\n'.length);
  }
  if (think.trim().length === 0) {
    return { think: '', answer: answer };
  }
  const formattedThink = think
    ? `**思考内容**\n\n${think
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n')}`
    : '';

  return { think: formattedThink + '\n', answer };
}
