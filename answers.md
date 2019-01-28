1. What is the purpose of using _sessions_?
  A: _sessions_ are used to keep users actively logged in.  Its a way of persisting authentication until the user has completed their current activities with the app. **
  **
2. What does bcrypt do to help us store passwords in a secure manner.
  A: bcrypt applies a hash to the submitted password as a method of encryption.  It is a one-way hash that cannot be reversed.  The hash can be configured to repeat a number of times ('hash of a hash of a hash') to keep thwart most normal attempts to break it.  

3. What does bcrypt do to slow down attackers?
  A: The hash can be configured to repeat a number of times ('hash of a hash of a hash') to keep thwart most normal attempts to break it.  Typically 16 times is enough to require so much computing power and time that the effort is not worth it.

4. What are the three parts of the JSON Web Token?
  A: The components of a JSON Web Token are:
    Header - Contains the metadata of type and algorithm used.

    Payload - The actual data to be transmitted and other information about the token.

    Signature - This part is a hash of the header + signature + a 'secret'.  The 'secret' is a signature known to the server so that the server can verify existing tokens and sign new ones.

