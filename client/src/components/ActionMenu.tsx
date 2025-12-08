import { cn } from "@/lib/utils";
import { useState } from "react";
import { EllipsisVertical, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "./ui/dialog";
import type { ActionMenuProps } from "@/types/props";

export const ActionMenu: React.FC<ActionMenuProps> = ({
    deleteDialogDescription,
    setIsEditing,
    isDeleting,
    onDelete,
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild disabled={isDeleting}>
                    <div className={cn("p-1.5 rounded-full h-fit", {
                        "cursor-pointer hover:bg-background-400": !isDeleting,
                    })}>
                        <EllipsisVertical className="size-6" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem 
                            onSelect={() => setIsEditing(true)}
                            className="flex gap-2 cursor-pointer"
                            disabled={isDeleting}
                        >
                            <img
                                src="/edit.svg"
                                width={20}
                                height={20}
                                alt="Edit icon"
                            />
                            <h2 className="text-[16px] leading-normal font-normal">Edit</h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onSelect={() => setShowDeleteDialog(true)}
                            className="flex gap-2 cursor-pointer"
                            disabled={isDeleting}
                        >
                            <img
                                src="/delete.svg"
                                width={20}
                                height={20}
                                alt="Delete icon"
                            />
                            <h2 className="text-[16px] leading-normal font-normal">Delete</h2>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            {deleteDialogDescription}
                        </DialogDescription>
                        <DialogFooter className="gap-4">
                            <DialogClose asChild>
                                <Button 
                                    type="button" 
                                    variant="secondary" 
                                    className="cursor-pointer font-semibold"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button 
                                type="submit"
                                className="cursor-pointer bg-primary-300 font-semibold hover:bg-primary-400"
                                onClick={onDelete}
                                disabled={isDeleting}
                            >
                                {
                                    isDeleting
                                    ? (
                                        <>
                                            Deleting
                                            <Loader2 className="size-5 animate-spin ml-2" />
                                        </>
                                    ) : (
                                        "Confirm"
                                    )
                                }
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
