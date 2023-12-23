import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import PropTypes from 'prop-types';
import './DocumentTreeView.css';
import { TreeViewLabel } from './TreeViewLabel';
import { InfoButton } from './InfoButton';
import { RequestVerbBadge } from './RequestVerbBadge';

export default function DocumentTreeView({
  apiDocuments,
  onRequestSelect,
  onDetailView,
}) {
  const handleDetailView = (data) => {
    if (onDetailView) onDetailView(data);
  };
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        minHeight: 1,
        maxHeight: 1,
        flexGrow: 1,
        minWidth: 300,
        maxWidth: 400,
        overflowY: 'auto',
        borderRadius: 1,
        padding: 2,
      }}
      defaultExpanded={['doc-0']}
    >
      {apiDocuments.map((apiDocument, documentIndex) => {
        return (
          <TreeItem
            nodeId={`doc-${documentIndex}`}
            label={
              <TreeViewLabel
                labelText={apiDocument.title}
                LabelInfo={() => (
                  <InfoButton
                    onDetailView={() => handleDetailView(apiDocument)}
                  />
                )}
              />
            }
            key={`doc-${documentIndex}`}
          >
            {apiDocument.requests?.map((requestItem) => (
              <TreeItem
                nodeId={`req-${documentIndex}-${requestItem.operationId}`}
                label={
                  <TreeViewLabel
                    labelText={requestItem.title}
                    LabelIcon={() => <RequestVerbBadge data={requestItem} />}
                  />
                }
                key={`req-${documentIndex}-${requestItem.operationId}`}
                onClick={() => {
                  onRequestSelect(requestItem, apiDocument.operationId);
                }}
              />
            ))}
          </TreeItem>
        );
      })}
    </TreeView>
  );
}

DocumentTreeView.propTypes = {
  apiDocuments: PropTypes.array.isRequired,
  onRequestSelect: PropTypes.func,
  onDetailView: PropTypes.func,
};
