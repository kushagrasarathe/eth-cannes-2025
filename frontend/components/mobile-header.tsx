import { useLogout } from '@privy-io/react-auth';
import { Loader2, Unplug } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

export function ConnectedButton () {
  const { logout } = useLogout();
  const mutationResult = useMutation({ mutationFn: logout, });

  return (
      <button
        onClick={() => mutationResult.mutate()}
        disabled={mutationResult.isPending}
        className="rounded-xl border hover:bg-gray-100 gap-2 h-[40px] w-[40px] items-center justify-center flex hover:scale-110 hover:drop-shadow-sm duration-75"
      >
        {
          mutationResult.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Unplug size={18} />
          )
        }
      </button>
  );
}