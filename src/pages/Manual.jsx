import TopBar from "../components/TopBar";
import "../styles/mainstyle.css";

function Manual() {
  return (
    <>
      <TopBar />
      <div id="manual">
        <h1>How the App Works</h1>

        <h3>Navigation to the Main Page</h3>
        <p>
          At any point, you can easily navigate back to the{" "}
          <a href="/">main page</a> by clicking on the app's logo in the top
          bar.
        </p>

        <h3>Loading Main Piano Rolls</h3>
        <p>
          At the main page, you'll notice a button labeled "
          <em>Load the Main Piano Rolls</em>". Clicking on this button triggers
          a request to an external API to fetch random piano roll data. This
          data is then stored in your browser's local storage. It's worth noting
          that each time you click this button, the previous data in local
          storage is cleared, and the new data is saved. Sometimes, very rarely,
          there is a problem with the API and the website doesn't properly
          import the data. If that's the case, try to go to the main page and
          reload the rolls.
        </p>

        <h3>Viewing All Piano Rolls</h3>
        <p>
          After you've clicked the "<em>Load the Main Piano Rolls</em>" button,
          you'll be redirected to a specific link that displays all the piano
          rolls presented in a grid layout with three columns by default.
          However, the number of columns adjusts dynamically for smaller
          screens, ensuring an optimal viewing experience.
        </p>

        <h3>Detailed Roll View</h3>
        <p>
          When you click on a specific piano roll in the grid, you'll be
          directed to a dedicated page for that roll. The main piano roll is
          displayed on the left side, and the remaining rolls are presented on
          the right side as a scrollable vertical component. For users with
          smaller screens, the rolls are displayed horizontally to improve
          convenience.
        </p>

        <h3>Selecting and Logging Data</h3>
        <p>
          To interact with the piano roll, you can click on specific points or
          coordinates within the roll. The first click initiates the starting
          point. The second click initiates the ending point.
          <strong>
            You don't need to keep your mouse clicked - this can lead to
            unexpected behaviors
          </strong>
          . When you've selected two coordinates, a button will appear, allowing
          you to log the selected data to the console. The logged data is stored
          in the console as a JSON file, including the corresponding data from
          the selected points on the piano roll and the number of notes within
          the selection.
        </p>
      </div>
    </>
  );
}

export default Manual;
