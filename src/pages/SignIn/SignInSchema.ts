import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { EMAIL_REGEX_PATTERN } from '@app/constants/regex';

export const useSignInSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    email: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('LOGIN.EMAIL') }) as string)
      .matches(EMAIL_REGEX_PATTERN, t('VALIDATE.INVALID', { field: t('LOGIN.EMAIL') }) as string),

    password: yup
      .string()
      .required(t('VALIDATE.REQUIRED', { field: t('LOGIN.PASSWORD') }) as string),
  });
};
