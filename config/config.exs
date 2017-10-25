# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenixforum,
  ecto_repos: [Phoenixforum.Repo]

# Configures the endpoint
config :phoenixforum, PhoenixforumWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "YU/EfzVKltupd5EGTMEeGoVLRLUwI7pHT2JU1zxPTUfvBJ3dRHg9JvF+M7Ua2Nzn",
  render_errors: [view: PhoenixforumWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Phoenixforum.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
