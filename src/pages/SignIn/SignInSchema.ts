import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { EMAIL_REGEX_PATTERN, PASSWORD_REGEX_PATTERN } from '@app/constants/regex';

export const useSignInSchema = () => {
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
  });
};
