ALTER TABLE user ADD `github_username` text;--> statement-breakpoint
ALTER TABLE user ADD `name` text;--> statement-breakpoint
ALTER TABLE user ADD `email` text;--> statement-breakpoint
ALTER TABLE user ADD `avatar` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_github_username_unique` ON `user` (`github_username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);