import AddReactionIcon from '@mui/icons-material/AddReaction';
import BuildIcon from '@mui/icons-material/Build';
import Person4Icon from '@mui/icons-material/Person4';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Stack } from '@mui/material';
import { MenuItem } from './components/menu-item.tsx';

export const Menu: React.FC = () => {
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{
        width: '100%',
      }}
    >
      <MenuItem icon={<BuildIcon />} title="Repairs" />
      <MenuItem icon={<TimeToLeaveIcon />} title="Cars" />
      <MenuItem icon={<AddReactionIcon />} title="Clients" />
      <MenuItem icon={<Person4Icon />} title="Employees" />
    </Stack>
  );
};
