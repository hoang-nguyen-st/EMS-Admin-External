import { Button, Modal } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UserModalProps } from '@app/interface/user.interface';

const UserModal: FC<UserModalProps> = ({ visible, user, onCancel, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={
        user?.status === 'active'
          ? t<string>('USER_MANAGEMENT.EDIT')
          : t<string>('USER_MANAGEMENT.ADD')
      }
      open={visible}
      onCancel={onCancel}
      footer={[]}
    >
      {user && <div></div>}
    </Modal>
  );
};

export default UserModal;
