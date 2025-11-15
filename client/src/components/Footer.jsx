export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          By accessing this page, you confirm that you have read, understood,
          and agreed to our Terms of Service, Cookie Policy, Privacy Policy, and
          Content Guidelines. All rights reserved. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

