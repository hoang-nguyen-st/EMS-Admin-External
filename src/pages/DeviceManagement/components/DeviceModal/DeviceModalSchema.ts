import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useDeviceModalSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    fieldCalculate: yup
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
    voltageValue: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.VOLTAGE') }))
      .matches(
        /^[0-9]+$/,
        t<string>('VALIDATE.NUMBER', { field: t<string>('DEVICE_MODAL.VOLTAGE') }),
      ),
    voltageUnit: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('DEVICE_MODAL.VOLTAGE_UNIT') }))
      .matches(
        /^[a-zA-Z0-9_]+$/,
        t<string>('VALIDATE.INVALID', { field: t<string>('DEVICE_MODAL.VOLTAGE_UNIT') }),
      ),
  });
};
