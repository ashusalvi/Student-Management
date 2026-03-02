import { AccountCircle, Call, Email } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Grid2,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { StudentProps } from '../../types';
import { genders } from '@/constants';

export const BasicInformation = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StudentProps>();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AccountCircle sx={{ mr: 1 }} />
        <Typography variant='body1'>Basic Information</Typography>
      </Box>

      <Grid2 container spacing={2} sx={{ my: 2 }}>
        {/* Full Name */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            {...register('name')}
            fullWidth
            label='Full Name'
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size='small'
          />
        </Grid2>

        {/* Phone */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            {...register('phone')}
            fullWidth
            label='Phone Number'
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Call fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </Grid2>

        {/* Email */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            {...register('email')}
            fullWidth
            label='Email'
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </Grid2>

        {/* DOB */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Controller
            name='dob'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Birth Date'
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(newDt) => onChange(newDt)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                    error: Boolean(error),
                    helperText: error?.message
                  }
                }}
              />
            )}
          />
        </Grid2>

        {/* Gender */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.gender)}>
            <InputLabel id='gender'>Gender</InputLabel>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Gender'>
                  {genders.map((gender) => (
                    <MenuItem key={gender.id} value={gender.id}>
                      {gender.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>
    </>
  );
};
