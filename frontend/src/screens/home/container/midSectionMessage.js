import React from 'react'
import { useSelector } from 'react-redux'
import Text from "../../../sharedComponents/presentation/text";

const MidSectionMessage = () => {

    const userData = useSelector((state) => state.user.persistantUserData);
    const isAdmin = userData && userData.isAdmin;

    return (
        isAdmin && (
            <Text
              Component={({ style }) => (
                <p style={{ ...style }}>
                  <span style={{color: 'orange'}}>Welcome </span>Admin!
                </p>
              )}
              size="40px"
              weight="bold"
            />
          )
    )
}

export default MidSectionMessage
