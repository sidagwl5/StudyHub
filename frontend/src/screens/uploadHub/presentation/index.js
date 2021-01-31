import React from "react";
import HighOrderContainer from '../../../sharedComponents/presentation/HOC';
import Form from '../container/form';

const UploadHub = ({ match }) => <Form match={match} />

export default HighOrderContainer(UploadHub)
