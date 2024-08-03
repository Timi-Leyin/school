"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/app/context/user-context";

export function NavMenu() {
	const { user } = useUser();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<img src="/logo.svg" className="w-[100px]" />
										<div className="mb-2 mt-4 text-lg font-medium">Voting</div>
										<p className="text-sm leading-tight text-muted-foreground">
											The Voting System is designed to facilitate seamless and
											fair elections for various school activities
											{/* ,such as student council elections, event planning, and other decision-making processes within the school community.   */}
											{/* This feature ensures transparency and encourages student participation. */}
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							{user?.role === "admin" && (
								<ListItem href="/dashboard/vote/new" title="Create a New Vote">
									Initiate a new voting process by defining the election title,
									description, candidate names, and voting period.
								</ListItem>
							)}
							<ListItem href="/docs/installation" title="Active Votes">
								View and manage ongoing voting processes. Monitor the number of
								votes cast, current standings, and voter participation rates.
							</ListItem>
							<ListItem href="/docs/primitives/typography" title="My Votes">
								Allow individual users to view and manage the votes they have
								participated in or are eligible to vote in. Track your voting
								history and upcoming votes.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{user?.role === "admin" && (
					<NavigationMenuItem>
						<Link href="/dashboard/manage/students" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Manage Students
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				)}

				{/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
