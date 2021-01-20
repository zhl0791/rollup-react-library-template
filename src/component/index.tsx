import React from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './styles.scss';

export interface IProps {
  text: string;
}

export default ({ text }: IProps) => {
  return <div className={styles.Name}>hello world</div>;
};
