import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from '@tanstack/react-router'

type Props = {
    tabName: string,
    tab: string,
    label: string
    linkTo: string
}

export default function TabButton({ tabName, tab, label, linkTo }: Props) {
    return (
        <Link
            to={linkTo}
            search={{ tab: tabName }}
            className='w-full mx-2 [&>*]:w-full'
        >
            <Button variant="secondary" className={cn('relative overflow-hidden p-0 text-primary', {
                ' bg-white/15 shadow-xl shadow-gray-700': tab === tabName,
                'bg-white/5': tab !== tabName,
            }
            )}>
                <span
                    className={cn('text-base absolute transition-all duration-500', {
                        'text-primary opacity-60': tab !== tabName,
                    }
                    )}
                >
                    {label}
                </span>

            </Button>
        </Link>
    )
}