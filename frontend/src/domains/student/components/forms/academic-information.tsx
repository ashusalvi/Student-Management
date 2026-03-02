import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Grid2,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import { School } from '@mui/icons-material';
import { parseISO } from 'date-fns';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { StudentProps } from '../../types';
import { useClasses } from '../../hooks';
import { useGetSectionsQuery } from '@/domains/section/api';

export const AcademicInformation = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StudentProps>();

  const classes = useClasses();
  const { data, isLoading } = useGetSectionsQuery();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <School sx={{ mr: 1 }} />
        <Typography variant='body1'>Academic Information</Typography>
      </Box>

      <Grid2 container spacing={2} sx={{ my: 2 }}>
        {/* Class */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.class)}>
            <InputLabel id='class'>Class</InputLabel>
            <Controller
              name='class'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Class'>
                  {classes.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.class?.message}</FormHelperText>
          </FormControl>
        </Grid2>

        {/* Section */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.section)}>
            <InputLabel id='section'>Section</InputLabel>
            <Controller
              name='section'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Section'>
                  {isLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : (
                    data?.sections?.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              )}
            />
            <FormHelperText>{errors.section?.message}</FormHelperText>
          </FormControl>
        </Grid2>

        {/* Roll */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <TextField
            {...register('roll')}
            fullWidth
            label='Roll'
            error={Boolean(errors.roll)}
            helperText={errors.roll?.message}
            size='small'
          />
        </Grid2>

        {/* Admission Date */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Controller
            name='admissionDate'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Admission Date'
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(newDate) => onChange(newDate)}
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
      </Grid2>
    </>
  );
};
