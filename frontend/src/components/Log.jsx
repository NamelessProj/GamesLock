import {IconButton, Typography} from "@material-tailwind/react";
import {format} from "date-fns";
import {FaTrashAlt} from "react-icons/fa";

const Log = ({log, locale, handleSingleDelete}) => {
    return (
        <div className="w-full p-6 rounded-xl bg-gradient-to-r from-blue-gray-700 to-blue-gray-900 relative">
            <IconButton
                variant="text"
                color="red"
                className="!absolute top-2 right-2"
                onClick={(e) => handleSingleDelete(e, log._id)}
            >
                <Typography className="sr-only">
                    Delete the log
                </Typography>
                <FaTrashAlt size={24} />
            </IconButton>
            <div>
                <Typography className="text-sm">
                    {format(log.createdAt, 'dd MMMM yyyy HH:mm', {locale})}
                </Typography>
                <div>
                    <Typography variant="lead">
                        {log.city ? log.city : 'UNKNOWN CITY'}, {log.country ? log.country : 'UNKNOWN COUNTRY'}
                    </Typography>
                    <div className="flex gap-3 items-center">
                        <Typography variant="lead" className="text-sm">
                            IP
                        </Typography>
                        <Typography variant="small">
                            {log.ip}
                        </Typography>
                    </div>
                </div>
                <div className="h-[2px] rounded-full w-full bg-primary-400 opacity-50 my-3" />
                <div>
                    <div className="flex gap-3 items-center">
                        <Typography variant="lead" className="text-sm">
                            Platform
                        </Typography>
                        <Typography variant="small">
                            {log.platform}
                        </Typography>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Typography variant="lead" className="text-sm">
                            System
                        </Typography>
                        <Typography variant="small">
                            {log.system}
                        </Typography>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Typography variant="lead" className="text-sm">
                            Name
                        </Typography>
                        <Typography variant="small">
                            {log.deviceName}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Log;