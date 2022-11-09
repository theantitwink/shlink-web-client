import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '../../utils/helpers/redux';
import { EditShortUrlData, ShortUrl, ShortUrlIdentifier } from '../data';
import { ShlinkApiClientBuilder } from '../../api/services/ShlinkApiClientBuilder';
import { parseApiError } from '../../api/utils';
import { ProblemDetailsError } from '../../api/types/errors';

const REDUCER_PREFIX = 'shlink/shortUrlEdition';
export const SHORT_URL_EDITED = `${REDUCER_PREFIX}/editShortUrl`;

export interface ShortUrlEdition {
  shortUrl?: ShortUrl;
  saving: boolean;
  saved: boolean;
  error: boolean;
  errorData?: ProblemDetailsError;
}

export interface EditShortUrl extends ShortUrlIdentifier {
  data: EditShortUrlData;
}

export type ShortUrlEditedAction = PayloadAction<ShortUrl>;

const initialState: ShortUrlEdition = {
  saving: false,
  saved: false,
  error: false,
};

export const shortUrlEditionReducerCreator = (buildShlinkApiClient: ShlinkApiClientBuilder) => {
  const editShortUrl = createAsyncThunk(
    SHORT_URL_EDITED,
    ({ shortCode, domain, data }: EditShortUrl, { getState }): Promise<ShortUrl> => {
      const { updateShortUrl } = buildShlinkApiClient(getState);
      return updateShortUrl(shortCode, domain, data as any); // FIXME parse dates
    },
  );

  const { reducer } = createSlice({
    name: REDUCER_PREFIX,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(editShortUrl.pending, (state) => ({ ...state, saving: true, error: false, saved: false }));
      builder.addCase(
        editShortUrl.rejected,
        (state, { error }) => ({ ...state, saving: false, error: true, saved: false, errorData: parseApiError(error) }),
      );
      builder.addCase(
        editShortUrl.fulfilled,
        (_, { payload: shortUrl }) => ({ shortUrl, saving: false, error: false, saved: true }),
      );
    },
  });

  return { reducer, editShortUrl };
};
