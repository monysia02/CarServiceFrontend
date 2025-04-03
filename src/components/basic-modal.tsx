import { FC, JSX } from 'react';
import { Card, Modal, Stack } from '@mui/material';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  modalBody: JSX.Element;
};

export const BasicModal: FC<Props> = ({ setIsModalOpen, isModalOpen, modalBody }) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Card
          sx={{
            p: 2,
            minWidth: 300,
          }}
        >
          {modalBody}
        </Card>
      </Stack>
    </Modal>
  );
};
