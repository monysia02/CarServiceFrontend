import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useFinishRepairMutation } from '../hook/use-finish-repair.ts';
import { useGetRepairsQuery } from '../hook/use-get-repairs.ts';

interface FinishRepairModalProps {
  open: boolean;
  onClose: () => void;
  repairId: string;
}

export const FinishRepairModal: React.FC<FinishRepairModalProps> = ({ open, onClose, repairId }) => {
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const { refetch } = useGetRepairsQuery();
  const { mutate: finishRepair, isPending: isLoading } = useFinishRepairMutation({
    onSuccess: () => {
      refetch();
      onClose();
    },
    onError: () => {
      console.error('Error finishing the repair.');
    },
  });

  const handleFinish = () => {
    finishRepair({ repairId, finalPrice });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Finish Repair
        </Typography>
        <TextField
          fullWidth
          type="number"
          label="Final Price"
          value={finalPrice}
          onChange={(e) => setFinalPrice(Number(e.target.value))}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleFinish}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Processing...' : 'Finish Repair'}
        </Button>
      </Box>
    </Modal>
  );
};
