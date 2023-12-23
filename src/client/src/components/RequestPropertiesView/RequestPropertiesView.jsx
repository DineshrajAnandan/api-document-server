import PropTypes from 'prop-types';
import styles from './RequestPropertiesView.module.css';
import { CustomTabs } from '../CustomTabs';

export default function RequestPropertiesView({ data }) {
  const tabsConfig = [
    {
      label: 'headers',
      element: (
        <pre className={styles.pre}>
          {JSON.stringify(data.headers, null, 2)}
        </pre>
      ),
    },
    {
      label: 'body',
      element: (
        <pre className={styles.pre}>{JSON.stringify(data.data, null, 2)}</pre>
      ),
    },
  ];

  return <CustomTabs data={tabsConfig}></CustomTabs>;
}

RequestPropertiesView.propTypes = {
  data: PropTypes.object,
};
