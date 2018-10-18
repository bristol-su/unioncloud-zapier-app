An integration of Unioncloud, the NUS digital platform, and Zapier.



<b><h3>Features</h3></b>

<ul>
  <li>Authentication
    <ul>
      <li>Authenticates a user, taking an email and password for a UnionCloud account and an app ID and password. Uses session authentication</li>
    </ul>
  </li>
  <li>Searches
    <ul>
      <li>Search by Student ID
        <ul>
          <li>Returns the basic information for a given student id. Takes student ID as the only argument</li>
        </ul>  
      </li>
      <li>Search by uID
        <ul>
          <li>Returns the basic information for a given uID. Takes uID as the only argument.</li>
        </ul>  
      </li>
      <li>Check if the user is a current student
        <ul>
          <li>Currently just checks if the student is found on unioncloud, given a student ID</li>
          <li>Preferably it'd check whether they were in the 'confirmed students' UG</li>
        </ul>  
      </li>
    </ul>  
  </li>
  <li>Triggers
    <ul>
      <li>Triggers on new UserGroup Membership
        <ul>
          <li>When a userGroup Membership is created (i.e. someone is added to a UserGroup), this trigger recieves the data</li>
        </ul>  
      </li>
    </ul>  
  </li>
  <li>Creates
  <ul>
    <li>Create a UserGroup Membership
      <ul>
        <li>Creates a UserGroup membership</li>
      </ul>  
    </li>
    <li>Delete a UserGroup Membership
      <ul>
        <li>Delete a UserGroup membership</li>
      </ul>  
    </li>
  </ul>  
</li>
</ul>
