import React from 'react';
import { Progress } from 'antd';

function getPasswordStrengthLevel(password: string) {
  // 定义密码强度等级
  var passwordStrengthLevels = {
    weak: 'weak',//"弱"
    medium: 'medium',//"中",
    strong: 'strong',//"高"
  };
  if (!password) {
    return passwordStrengthLevels.weak;
  }

  // 判断密码长度
  if (password.length < 8) {
    return passwordStrengthLevels.weak;
  }

  // 判断密码字符集合多样性
  var hasLowerCase = /[a-z]/.test(password);
  var hasUpperCase = /[A-Z]/.test(password);
  var hasDigit = /\d/.test(password);
  var hasSpecialChar = /[@$!%*?&#+]/.test(password);

  var diversityCount = (hasLowerCase ? 1 : 0) + (hasUpperCase ? 1 : 0) + (hasDigit ? 1 : 0) + (hasSpecialChar ? 1 : 0);

  if (diversityCount < 3) {
    return passwordStrengthLevels.weak;
  } else if (diversityCount < 4) {
    return passwordStrengthLevels.medium;
  } else {
    return passwordStrengthLevels.strong;
  }
}

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const calculateStrength = () => {
    // 根据密码的复杂性计算强度等级
    // 你可以使用之前提到的 getPasswordStrengthLevel 函数来计算密码强度等级
    // 这里只是一个示例，你可以根据实际情况进行定制
    // 假设 getPasswordStrengthLevel 返回弱、中、强分别对应 0、1、2
    const strengthLevel = getPasswordStrengthLevel(password);
    console.log('密码强度', strengthLevel);
    // 根据强度等级返回相应的进度条颜色和百分比
    switch (strengthLevel) {
      case 'weak':
        return { color: 'red', percent: 33 };
      case 'medium':
        return { color: 'orange', percent: 66 };
      case 'strong':
        return { color: 'green', percent: 100 };
      default:
        return { color: 'gray', percent: 0 };
    }
  };

  const strength = calculateStrength();

  return (
    <div>
      <Progress
        strokeColor={strength.color}
        percent={strength.percent}
        showInfo={false}
      />
    </div>
  );
};

export default PasswordStrengthIndicator;
