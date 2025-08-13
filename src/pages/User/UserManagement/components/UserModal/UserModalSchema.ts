import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  EMAIL_REGEX_PATTERN,
  NO_SPECIAL_CHARACTER_IN_NAME,
  PHONE_REGEX_PATTERN,
} from '@app/constants/regex';

export const useUserModalSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('LOGIN.EMAIL') }))
      .trim()
      .matches(
        EMAIL_REGEX_PATTERN,
        t<string>('VALIDATE.INVALID', { field: t<string>('LOGIN.EMAIL') }),
      )
      .max(100, t<string>('VALIDATE.MAX_LENGTH', { field: t<string>('LOGIN.EMAIL'), number: 100 })),

    name: yup
      .string()
      .trim()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.NAME') }))
      .min(2, t<string>('VALIDATE.MIN_LENGTH', { field: t<string>('USER.NAME'), number: 2 }))
      .max(150, t<string>('VALIDATE.MAX_LENGTH', { field: t<string>('USER.NAME'), number: 50 }))
      .matches(
        NO_SPECIAL_CHARACTER_IN_NAME,
        t<string>('VALIDATE.SPECIAL_CHARACTER', { field: t<string>('USER.NAME') }),
      ),

    phone: yup
      .string()
      .trim()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.PHONE') }))
      .matches(
        PHONE_REGEX_PATTERN,
        t<string>('VALIDATE.INVALID', { field: t<string>('USER.PHONE') }),
      ),

    dateOfBirth: yup
      .date()
      .typeError(t<string>('VALIDATE.INVALID', { field: t<string>('USER.DATE_OF_BIRTH') }))
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.DATE_OF_BIRTH') }))
      .max(new Date(), t<string>('VALIDATE.DATE_PAST', { field: t<string>('USER.DATE_OF_BIRTH') })),

    address: yup
      .string()
      .trim()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.ADDRESS') }))
      .min(2, t<string>('VALIDATE.MIN_LENGTH', { field: t<string>('USER.ADDRESS'), number: 2 })),
  });
};
