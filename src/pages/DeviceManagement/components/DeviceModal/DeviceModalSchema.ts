import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useDeviceModalSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    field: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.FIELD') }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        t<string>('VALIDATE.INVALID', { field: t<string>('DEVICE_MODAL.FIELD') }),
      ),
    deviceType: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.DEVICE_TYPE') }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        t<string>('VALIDATE.INVALID', { field: t<string>('DEVICE_MODAL.DEVICE_TYPE') }),
      ),
    meterType: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.METER_TYPE') }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        t<string>('VALIDATE.INVALID', { field: t<string>('DEVICE_MODAL.METER_TYPE') }),
      ),
    voltage: yup
      .number()
      .typeError(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.VOLTAGE') }))
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.VOLTAGE') }))
      .min(1, t<string>('VALIDATE.MIN', { field: t<string>('DEVICE_MODAL.VOLTAGE'), min: 1 })),
    voltageUnit: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.VOLTAGE_UNIT') }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        t<string>('VALIDATE.INVALID', { field: t<string>('DEVICE_MODAL.VOLTAGE_UNIT') }),
      ),
  });
};
