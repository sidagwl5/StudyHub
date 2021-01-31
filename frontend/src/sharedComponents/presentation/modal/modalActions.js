import React, {memo} from 'react';
import Button from '@material-ui/core/Button';

const ModalActions = ({btnTitle, specificAction={ hidden: false, operation: null }, cancelAction, disabled=false}) => (
  <div
    style={{
        position: 'relative',
        width: '100%',
        height: '45px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '0px 10px',
        boxSizing: 'border-box'
    }}
>
    <Button
        variant="text"
        size="large"
        style={{ margin: '0px 10px' }}
        color="primary"
        onClick={specificAction.operation}
        disabled={disabled}
        hidden={specificAction.hidden}
    >
        {btnTitle}
    </Button>

    <Button
        variant="text"
        size="large"
        style={{ color: 'red' }}
        onClick={cancelAction}
    >
        Cancel
    </Button>
</div>

)

export default memo(ModalActions);