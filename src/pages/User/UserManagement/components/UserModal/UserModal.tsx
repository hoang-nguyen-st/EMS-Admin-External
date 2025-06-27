import { Modal } from 'antd';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserStatus } from '@app/constants';
import { UserColumns } from '@app/interface/user.interface';

export interface UserModalProps {
  visible: boolean;
  user: UserColumns | null;
  onCancel: () => void;
  onSubmit: () => void;
}

const UserModal: FC<UserModalProps> = ({ visible, user, onCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    }
  }, [visible]);

  const handleAfterClose = () => {
    setIsMounted(false);
  };

  if (!isMounted && !visible) {
    return null;
  }

  return (
    <Modal
      title={
        user?.status === UserStatus.ACTIVE
          ? t<string>('USER_MANAGEMENT.EDIT')
          : t<string>('USER_MANAGEMENT.ADD')
      }
      open={visible}
      onCancel={onCancel}
      afterClose={handleAfterClose}
      footer={[]}
    ></Modal>
  );
};

export default UserModal;
