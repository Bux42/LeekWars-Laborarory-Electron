import { useState } from 'react';
import { message } from 'antd';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import {
  GenerateFightRequest,
  GenerateFightResponse,
} from '../../services/leekwarsToolsAPI.schemas';

type GenerateFightHook = (options?: {
  mutation?: UseMutationOptions<
    GenerateFightResponse,
    unknown,
    { data: GenerateFightRequest },
    unknown
  >;
}) => Pick<
  UseMutationResult<
    GenerateFightResponse,
    unknown,
    { data: GenerateFightRequest },
    unknown
  >,
  'mutate'
>;

/**
 * Reusable hook that wraps any fight generation mutation hook (duel, team, farmer).
 * Uses hook-level callbacks to ensure the fight URL is opened even if the
 * component unmounts before the mutation resolves.
 */
function useGenerateFight(useMutationHook: GenerateFightHook) {
  const [generatingFight, setGeneratingFight] = useState(false);

  const { mutate } = useMutationHook({
    mutation: {
      onSuccess: (_data, variables) => {
        const fightUrl = new URL(
          `fight/${variables.data.fightId}`,
          process.env.VUE_FRONT_END_URL || 'http://localhost:4173/',
        ).toString();

        window.electron.shell.openExternal(fightUrl);
      },
      onError: () => {
        message.error('Failed to generate fight.');
      },
      onSettled: () => {
        setGeneratingFight(false);
      },
    },
  });

  const handleGenerateFight = (fightId: string) => {
    setGeneratingFight(true);
    mutate({ data: { fightId } });
  };

  return { generatingFight, handleGenerateFight };
}

export default useGenerateFight;
