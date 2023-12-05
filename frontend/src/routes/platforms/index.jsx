import { Link, useFetcher, useLoaderData } from "react-router-dom";
import { deletePlatform, getPlatforms } from "../../api/platforms";
import { useUser } from "../../shared/navbar/use-user";
import "./styles.css";
import { PageTitle } from "../../shared/page-title";

export async function loader() {
  const platforms = await getPlatforms();
  return { platforms };
}

export async function action({ request }) {
  let formData = await request.formData();
  return deletePlatform(formData.get("platformId"));
}

export function Platforms() {
  const { platforms } = useLoaderData();
  const { user } = useUser();

  const fetcher = useFetcher();

  return (
    <div className="platform-container">
      <PageTitle>Plataformas</PageTitle>
      <section className="">
        {platforms.map((platform) => (
          <div key={platform.id} className="platform-content">
            <a target="_blank" href={platform.link} rel="noreferrer">
              <img src={platform.image} alt="" className="platform-image" />
            </a>
            <a
              className="platform-title"
              target="_blank"
              href={platform.link}
              rel="noreferrer"
            >
              {platform.name}
            </a>
            {user && (
              <fetcher.Form method="post">
                <button
                  className="delete-button"
                  value={platform.id}
                  name="platformId"
                  aria-label="Apagar Plataforma"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </fetcher.Form>
            )}
          </div>
        ))}
      </section>
      {user && (
        <section className="platform-action-button">
          <Link className="platform-create-link" to="/plataformas/criar">
            Adicionar Plataforma
          </Link>
        </section>
      )}
    </div>
  );
}
