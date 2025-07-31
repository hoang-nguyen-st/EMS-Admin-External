import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import {
  EMAIL_REGEX_PATTERN,
  PASSWORD_REGEX_PATTERN,
  PHONE_REGEX_PATTERN,
} from '@app/constants/regex';

export const useUserModalSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('LOGIN.EMAIL') }))
      .matches(
        EMAIL_REGEX_PATTERN,
        t<string>('VALIDATE.INVALID', { field: t<string>('LOGIN.EMAIL') }),
      ),

    password: yup
      .string()
      .matches(
        PASSWORD_REGEX_PATTERN,
        t<string>('VALIDATE.RULE_PASSWORD', { field: t<string>('LOGIN.PASSWORD') }),
      )
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('LOGIN.PASSWORD') })),

    name: yup
      .string()
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.NAME') }))
      .test(
        'not-only-whitespace',
        t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.NAME') }),
        (value) => {
          return value ? value.trim().length > 0 : false;
        },
      )
      .min(2, t<string>('VALIDATE.MIN_LENGTH', { field: t<string>('USER.NAME'), min: 2 }))
      .max(50, t<string>('VALIDATE.MAX_LENGTH', { field: t<string>('USER.NAME'), max: 50 })),

    phone: yup
      .string()
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
      .required(t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.ADDRESS') }))
      .test(
        'not-only-whitespace',
        t<string>('VALIDATE.REQUIRED', { field: t<string>('USER.ADDRESS') }),
        (value) => {
          return value ? value.trim().length > 0 : false;
        },
      )
      .max(255, t<string>('VALIDATE.MAX_LENGTH', { field: t<string>('USER.ADDRESS'), max: 255 })),
  });
};
