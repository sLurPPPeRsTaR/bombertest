import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React, {FC, ReactNode} from 'react';

interface IButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

const Button: FC<IButtonProps> = props => {
  const {children, ...res} = props;
  return (
    <TouchableOpacity {...res}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
