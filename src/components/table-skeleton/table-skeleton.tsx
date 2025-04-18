import {Skeleton} from "@mui/joy";

export default function TableSkeleton({rows = 5, cols = 5}) {
    return (
        <>
            {Array.from({length: rows}).map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({length: cols}).map((_, colIndex) => (
                        <td key={colIndex}>
                            <Skeleton variant='text' level='body-sm' />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}